import React, { useEffect } from 'react';
import MaterialTable from 'material-table'
import { apiCreateCampaign } from '../../../api/apiCreateCampaign'
import { apiListCampaign } from '../../../api/apiListCampaign';
import { apiDeleteCampaign } from '../../../api/apiDeleteCampaign';
import 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { apiListDepartaments } from '../../../api/apiListDepartaments';
import { apiUpdateCampaign } from '../../../api/apiUpdateCampaign';
import moment from 'moment';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PatternsByCampaign from './patterns';
moment.locale('pt-br');

export default function Editable() {
	const { useState } = React;

	const [departments, setDepartaments] = useState();

	const listColumns = [
		{ title: 'Campanha', field: 'name' },
		{ title: 'Departamento', field: 'departmentid', lookup: {...departments} },
		{ title: 'Data Início', field: 'datestart', type: 'date', dateSetting: { locale: 'pt-br' } },
		{ title: 'Data Fim', field: 'dateend', type: 'date', dateSetting: { locale: 'pt-br' }},
		{
			title: 'Status',
			field: 'active',
			lookup: { true: 'Ativo', false: 'Desativado' },
		}
	];

	const [data, setData] = useState([]);

	async function listItems() {
		await apiListCampaign().then(function(data){
			let itemArray = [];

			data.forEach(item => {
				itemArray.push({
					active: item.active,
					campaignid: item.campaignid,
					dateend: moment.tz(item.dateend, 'America/Sao_Paulo').format(),
					datestart: moment.tz(item.datestart, 'America/Sao_Paulo').format(),
					departmentid: item.departmentid,
					name: item.name
				});
			});
			
			setData(itemArray);
		});
	}

	async function listDepartaments() {
		await apiListDepartaments().then(function(data){
			let itemArray = [];

			data.map(item=>itemArray[item.departmentid]=item.name);
			
			// const departs = data.reduce((unico, item) => {
			//   return unico.includes(item.name) ? unico : [...unico, item.name]
			// }, []);

			setDepartaments(itemArray);
		});
	}

	useEffect(() => {
		(async () => {
			listDepartaments();
			listItems();
		})();
	}, []);
	
	return (
		<MaterialTable
			title="Campanhas"
			columns={listColumns}
			data={data}
			options={{
				paging:true,
				pageSize:10,
				emptyRowsWhenPaging: true,
				pageSizeOptions:[10,20,30,50],
				exportButton: true
			}}

			localization={{
				header: {
					actions: 'Ações'
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
					dateTimePickerLocalization: ptBR,
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
							apiCreateCampaign(newData).then(function(dataResult){
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

							apiUpdateCampaign(newData).then(function(data){
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
							const campaignId = oldData.campaignid;

							apiDeleteCampaign(campaignId).then(function(data){
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

			detailPanel={[
				{
					icon: () => <PhotoLibraryIcon style={{ color: '#333' }} />,
					openIcon: () => <PhotoLibraryIcon style={{ color: '#000' }} />,
					tooltip: 'Estampas',
					onClick: rowData => {
						console.log(rowData);
						// onClick action e.g. fetch data
					},
					isFreeAction: true,
					render: rowData => {
						return (
							<PatternsByCampaign campaignId={rowData.campaignid} />
						)
					},
				},
			]}
		/>
	)
}