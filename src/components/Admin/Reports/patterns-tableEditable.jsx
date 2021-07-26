import React, { useEffect } from 'react';
import MaterialTable from 'material-table'
import 'date-fns';

export default function PatternsEditable(props) {
  const { useState } = React;

  const [columns, setColumns] = useState();
  
  const [data, setData] = useState([]);

  // async function listItems() {
  //   await apiListDepartaments().then(function(data){
  //     setData(data);
	// 	});
  // }

  useEffect(() => {
    (async () => {
      setColumns([
        { title: 'ID', field: 'patternclotheid', editable: 'never', hidden: true },
        { title: 'Estampa', field: 'photo', render: rowData => <img src={`${rowData.photo}`} alt={`${rowData.name}`} style={{width: 50, borderRadius: '5px'}} /> },
        { title: 'Descrição', field: 'name' },
        { title: 'Divisão', field: 'division' },
        { title: 'Tema', field: 'theme' },
        { title: 'Cor Predominante', field: 'color', render: rowData => <div alt={rowData.color} title={rowData.color} style={{width: 30, height: 30, borderRadius: '100%', backgroundColor: rowData.color, borderWidth: '2px', borderStyle: 'solid', borderColor: '#333'}}></div> },
        { title: 'Gostaram', field: 'likes' },
        { title: 'Não gostaram', field: 'notlikes' },
        { title: 'Total de votos', field: 'totalVotes' },
        { title: '% Aprovação', field: 'perclikes' },
      ]);

      setData(props.data);

    })();
  }, [props]);

  return (
    <MaterialTable
      title="Estampas"
      columns={columns}
      data={data}
      options={{
        exportButton: {
          csv: true,
          pdf: false
        },
        exportAllData: true
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
    />
  )
}