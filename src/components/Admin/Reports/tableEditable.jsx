import React, { useEffect, useRef } from 'react';
import MaterialTable from 'material-table'
import 'date-fns';
import SearchIcon from '@material-ui/icons/Search';
import PatternsEditable from './patterns-tableEditable';

export default function Editable(props) {
  const { useState } = React;

	const [isLoading, setIsLoading] = useState(true);

  const [columns, setColumns] = useState();

  const [data, setData] = useState([]);

  // async function listItems() {
  //   await apiListDepartaments().then(function(data){
  //     setData(data);
	// 	});
  // }
  
  const tableRef = useRef();

  const downloadCsv = (data, fileName) => {
    const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    a.setAttribute("download", finalFileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useEffect(() => {
    (async () => {
      setColumns([
        { title: 'ID', field: 'departmentid', editable: 'never', hidden: true  },
        { title: 'Campanha', field: 'name' },
        { title: 'Departamento', field: 'department.name' },
        { title: 'Data Início', field: 'datestart', type: 'date', dateSetting: { locale: 'pt-br' } },
        { title: 'Data Fim', field: 'dateend', type: 'date', dateSetting: { locale: 'pt-br' }},
        {
          title: 'Status',
          field: 'active',
          lookup: { true: 'Ativo', false: 'Desativado' },
        },
      ]);
      
      if(props && props.dataItems) {
        setIsLoading(false);
        setData(props.dataItems);
      }
    })();
  }, [props]);

  return (
    <div>
      {isLoading && 'OKkkkkkkkkkkkkkkkk'}
        <MaterialTable
          title="Relatório"
          columns={columns}
          data={data}
          tableRef={tableRef}
          options={{
            exportButton: {
              csv: true,
              pdf: false
            },
            exportAllData: true,
            exportCsv: (columns, data) => {
              const headerRow = columns.map(col => {
                if (typeof col.title === 'object') {
                  return col.title.props.text;
                }
                return col.title;
              });

              headerRow.push('Departamento');
              headerRow.push('Divisão');
              headerRow.push('Tema');
              headerRow.push('Cor');
              headerRow.push('Gostaram');
              headerRow.push('Nao Gostaram');
              headerRow.push('% de Aprovação');
              headerRow.push('Total de votos');

              let dataRows2 = [];

              data.forEach(function(el, index) {
                let newObjMain = {};

                newObjMain['ID'] = el.campaignid;
                newObjMain['Campanha'] = el.name;
                newObjMain['Departamento'] = el.departmentid;
                newObjMain.datestart = el.datestart;
                newObjMain.dateend = el.dateend;
                newObjMain.active = el.active;
                dataRows2.push(newObjMain);

                if (el.patternclothes) {
                  el.patternclothes.forEach(function(el2, index) {
                      let newObj = {};

                      newObj['ID'] = '';
                      newObj['Campanha'] = '';
                      newObj['Departamento'] = '';
                      newObj.datestart = '';
                      newObj.dateend = '';
                      newObj.status = '';
                      newObj.namePattern = el2.name;
                      newObj.division = el2.division;
                      newObj.theme = el2.theme;
                      newObj.color = el2.color;
                      newObj.like = el2.likes;
                      newObj.notlike = el2.notlikes;
                      newObj.perclikes = el2.perclikes;
                      newObj.totalVotes = el2.totalVotes;

                      dataRows2.push(newObj);
                  }) 
                }
              });
  
              const dataRowsFinish = dataRows2.map(({ tableData, ...row }) => Object.values(row));
  
              const delimiter = ",";
              const csvContent = [headerRow, ...dataRowsFinish].map(e => e.join(delimiter)).join("\n");
  
              const csvFileName = 'estampas-by-campaign';
  
              downloadCsv(csvContent, csvFileName);
            }
          }}

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
              emptyDataSourceMessage: 'Sem dados para exibir',
              deleteText: 'Tem de que deseja exlcuir esta linha?',
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
          
          detailPanel={[
            {
              icon: () => <SearchIcon style={{ color: '#333' }} />,
              openIcon: () => <SearchIcon style={{ color: '#000' }} />,
              tooltip: 'Detalhes',
              onClick: rowData => {
                console.log(rowData);
                // onClick action e.g.
              },
              isFreeAction: true,
              render: rowData => {
                return (
                  <PatternsEditable data={rowData.patternclothes} />
                )
              },
            },
          ]}
        />
    </div>
  )
}