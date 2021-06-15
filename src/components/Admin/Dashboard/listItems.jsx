import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText component="a" primary="Usuários" />
    </ListItem>
    <ListItem button href="/createCampaing">
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Cadastro Campanha" />
    </ListItem>
    <ListItem button href="/createPatternClothe">
      <ListItemIcon>
        <AddPhotoAlternateIcon />
      </ListItemIcon>
      <ListItemText primary="Cadastro Estampa" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Relatórios" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button href="/admin">
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);