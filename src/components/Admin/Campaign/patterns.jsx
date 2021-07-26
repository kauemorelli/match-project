import React, { useEffect } from 'react';
import MaterialTable from 'material-table'
import pt from 'date-fns/locale/pt';
import { apiPatterns } from '../../../api/apiPatterns';
import { apiUpdatePattern } from '../../../api/apiUpdatePattern';
import { apiDeletePattern } from '../../../api/apiDeletePattern';
import { apiCreatePattern } from '../../../api/apiCreatePattern';
import moment from 'moment';
import { registerLocale } from 'react-datepicker';
import FileBase64 from 'react-file-base64';
// import ptBR from 'date-fns/locale/pt-BR'
// import { registerLocale } from 'react-datepi';
registerLocale('pt', pt);
moment.locale('pt-br');

export default function PatternsByCampaign(props) {
	const { useState } = React;

	const listColumns = [
		{
            title: 'Estampa',
            field: 'photo',
            render: rowData => <img src={`${rowData.photo}`} alt={`${rowData.name}`} style={{width: 50, borderRadius: '5px'}} />,
            editComponent: (props) => (
				<>
					<FileBase64
						multiple={ false }
						onDone={ (files) => {
							props.rowData.photo = files.base64;
						} }
					/>
				</>
			)
        },
        { title: 'Campanha', field: 'name' },
        { title: 'Divisão', field: 'division' },
        { title: 'Tema', field: 'theme' },
        { title: 'Cor Predominante', field: 'color', render: rowData => <div alt={rowData.color} title={rowData.color} style={{width: 30, height: 30, borderRadius: '100%', backgroundColor: rowData.color, borderWidth: '2px', borderStyle: 'solid', borderColor: '#333'}}></div> },
	];

	const [data, setData] = useState([]);
	const [campaignId, setCampaignId] = useState(props.campaignId);


	// async function listItems() {
	// 	await apiPatterns(campaignId).then(function(data){
	// 		setData(data);
	// 	});
	// }

	// useEffect(() => {
	// 	(async () => {
	// 		setCampaignId(props.campaignId);
	// 		listItems();
	// 	})();
	// }, [props, listItems]);

	useEffect(() => {
		setCampaignId(props.campaignId);
		async function listItems() {
			await apiPatterns(props.campaignId).then(function(data){
				setData(data);
			});
		}
		listItems();
	}, [props]);

	return (
		<MaterialTable
			title="Estampas"
			columns={listColumns}
			data={data}
			options={{
				paging:true,
				pageSize:10,
				emptyRowsWhenPaging: true,
				pageSizeOptions:[10,20,30,50],
				headerStyle: {
					backgroundColor: '#e2e2e2',
				}
			}}

			style={{
				backgroundColor: '#f1f1f1'
			}}

			localization={{
				header: {
					actions: ''
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
					dateTimePickerLocalization: pt,
				},
				editRow: {
				deleteText: 'Tem certeza de que deseja excluir?',
				cancelTooltip: 'Cancelar',
				saveTooltip: 'Sim',
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
				}
			}}

			editable={{
				onRowAdd: newData =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							apiCreatePattern(newData, campaignId).then(function(dataResult){
								setData([...data, dataResult.result]);
								resolve();
							})
							.catch(function (error) {
								resolve();
							});
						}, 1000)
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;

							apiUpdatePattern(newData).then(function(data){
								setData([...dataUpdate]);
								resolve(data);
							})
							.catch(function (error) {
								resolve();
							});

							// resolve();
						}, 1000)
					}),
				onRowDelete: oldData =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							const dataDelete = [...data];
							const index = oldData.tableData.id;
							const patternclotheid = oldData.patternclotheid;

							apiDeletePattern(patternclotheid).then(function(data){
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