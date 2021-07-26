import React, { useEffect } from 'react';
import MaterialTable from 'material-table'
import { apiDepartaments } from '../../../api/apiCreateDepartaments'
import { apiListDepartaments } from '../../../api/apiListDepartaments';
import { apiDeleteDepartaments } from '../../../api/apiDeleteDepartaments';
import { apiUpdateDepartaments } from '../../../api/apiUpdateDepartaments';

export default function Editable() {
  const { useState } = React;

  const [columns, setColumns] = useState();

  // const [data, setData] = useState([
  //   { name: 'Top malhas', active: true },
  //   { name: 'Trendy', active: false },
  //   { name: 'Mindse7', active: true },
  // ]);

  const [data, setData] = useState([]);

  async function listItems() {
    await apiListDepartaments().then(function(data){
      setData(data);
		});
  }

  useEffect(() => {
    (async () => {
      setColumns([
        { title: 'ID', field: 'departmentid', editable: 'never', hidden: true  },
        { title: 'Nome do departamento', field: 'name' },
        {
          title: 'Status',
          field: 'active',
          lookup: { true: 'Ativo', false: 'Desativado' },
        },
      ]);

      listItems();

      let res = await apiListDepartaments();
      if (res.success) {
        setData(res.data);
      }
    })();
  }, []);

  return (
    <MaterialTable
      title="Departamentos"
      columns={columns}
      data={data}
      localization={{
        header: {
          actions: 'Ações'
        },
        toolbar: {
          searchPlaceholder: 'Buscar'
        },
        pagination: {
          firstTooltip: 'Primeiro',
          previousTooltip: 'Anterior',
          nextTooltip: 'Próximo',
          lastTooltip: 'Último',
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'itens'
        },
        body: {
          deleteText: 'Tem de que deseja exlcuir esta linha?',
          emptyDataSourceMessage: 'Sem dados para exibir',
          addTooltip: 'Adicionar',
          deleteTooltip: 'Deletar',
          editTooltip: 'Editar',
          editRow: {
            deleteText: 'Tem certeza de que deseja excluir?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Salvar',
          },
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {

              apiDepartaments(newData).then(function(dataResult){
                setData([...data, dataResult.result]);
                resolve();
              })
              .catch(function (error) {
                resolve();
              });
              
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;

              apiUpdateDepartaments(newData).then(function(data){
                resolve(data);
              })
              .catch(function (error) {
                resolve();
              });

              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              const departamentId = oldData.departmentid;

              apiDeleteDepartaments(departamentId).then(function(data){
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve(data);
              })
              .catch(function (error) {
                resolve();
              });
              
              // resolve()
            }, 1000)
          }),
      }}
    />
  )
}