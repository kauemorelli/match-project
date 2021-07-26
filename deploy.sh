#!/bin/bash

oc project "$OCP_NAMESPACE"

if [ -z "${CI_ENVIRONMENT_NAME}" ]; then
    echo 'ERROR: "$CI_ENVIRONMENT_NAME" is not setted!'
    echo 'Can not deploy to undefined environment'
    exit 1
fi

if [ -n "$CI_BUILD_TAG" ]; then
    CONTAINER_IMAGE="${CI_REGISTRY_IMAGE}:${CI_BUILD_TAG}"
else
    CONTAINER_IMAGE="${CI_REGISTRY_IMAGE}:HOM-${CI_PIPELINE_ID}"
fi

files=($(ls -1 openshift/[0-9]*.yaml))
################################################################################
# Function to replace yaml file "variables".
function replace_var {
    local pattern="${1}"
    local subs="${2}"
    local SEP="${3-/}"

    echo "s${SEP}${pattern}${SEP}${subs}${SEP}g"
    for yaml_file in "${files[@]}"; do
        sed -i "s${SEP}${pattern}${SEP}${subs}${SEP}g" "$yaml_file"
    done
}
################################################################################


echo ">> Change project variables..."
replace_var 'KUBE_NAMESPACE' "$KUBE_NAMESPACE"
replace_var 'CLUSTER' "$CLUSTER"
replace_var 'CI_PROJECT_NAME' "$CI_PROJECT_NAME"
replace_var 'CI_REGISTRY' "$CI_REGISTRY"
replace_var 'CI_ENVIRONMENT_SLUG' "$CI_ENVIRONMENT_SLUG"
replace_var 'CI_PROJECT_PATH_SLUG' "$CI_PROJECT_PATH_SLUG"
# Utilizado @ no separador pois o conteudo da variavel tem /
replace_var 'CONTAINER_IMAGE' "$CONTAINER_IMAGE" '@'
# Configuracoes dos Pods
replace_var 'REQUEST_CPU' "$REQUEST_CPU"
replace_var 'REQUEST_MEMORY' "$REQUEST_MEMORY"
replace_var 'LIMITS_CPU' "$LIMITS_CPU"
replace_var 'LIMITS_MEMORY' "$LIMITS_MEMORY"
replace_var 'READINESS_INITIAL_DELAY' "$READINESS_INITIAL_DELAY"
replace_var 'LIVENESS_INITIAL_DELAY' "$LIVENESS_INITIAL_DELAY"
# Configuracoes de auto scaling
replace_var 'POD_REPLICA_MIN' "$POD_REPLICA_MIN"
replace_var 'POD_REPLICA_MAX' "$POD_REPLICA_MAX"
replace_var 'SCALING_BY_CPU_PERC' "$SCALING_BY_CPU_PERC"
replace_var 'INGRESS_NAME' "$INGRESS_NAME"
replace_var 'INGRESS_DOMAIN' "$INGRESS_DOMAIN"

###### Temporario, até cluster versão 4.8 ou 4.9 #######################################################################
if  [ "${CI_ENVIRONMENT_NAME}" == "homolog" ]; then
    # Homolog
    ls openshift/[0-9]*service.yaml | xargs sed -i "s/__SVC_TYPE__/ClusterIP/g"
    ls openshift/[0-9]*service.yaml | xargs sed -i "s/__SVC_ANNOTATIONS__//g"
    ls openshift/[0-9]*route.yaml | xargs sed -i \
      "s/__RT_TLS_CFG__/tls:\n    termination: edge\n    insecureEdgeTerminationPolicy: Allow/g"
elif [ "${CI_ENVIRONMENT_NAME}" == "production" ]; then
    # Prod
    ls openshift/[0-9]*service.yaml | xargs sed -i "s/__SVC_TYPE__/LoadBalancer/g"
    ls openshift/[0-9]*service.yaml | xargs sed -i "s@__SVC_ANNOTATIONS__@annotations:\n
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: ${AWS_ACM}@g" 
    ls openshift/[0-9]*route.yaml | xargs sed -i "s/__RT_TLS_CFG__//g"
fi
########################################################################################################################

# Mostra arquivos yaml no console caso seja ambiente homologação
if [ "${CI_ENVIRONMENT_NAME}" == "homolog" ]; then
    echo ">> Displaying applicable yaml files"
    ls -1 openshift/[0-9]*.yaml | xargs cat
    oc get secret ${CI_PROJECT_NAME}
fi

# Executa dry-run
echo ">> [DRY-RUN] Image \"$CONTAINER_IMAGE\" to env \"${CI_ENVIRONMENT_URL}\" at \"$HOSTNAME\"..."
for yaml_file in "${files[@]}"; do
    oc apply --dry-run=true -f "$yaml_file"
done

echo ">> Deploying image ${CONTAINER_IMAGE} to env ${CI_ENVIRONMENT_URL} at ${HOSTNAME}..."
# oc get secret ${CI_PROJECT_NAME} && oc delete secret ${CI_PROJECT_NAME} || echo "No Secrets found"
# oc create secret generic $CI_PROJECT_NAME --from-file=.env=$ENV
for yaml_file in "${files[@]}"; do
    oc apply -f "$yaml_file"
done

echo ""

sleep 2s
echo ">> Status Deploy:"
oc get deploy ${CI_PROJECT_NAME}

echo ">> Deployed to $CI_ENVIRONMENT_URL"
