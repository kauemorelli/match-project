import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToApp from '@material-ui/icons/ExitToApp';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BusinessIcon from '@material-ui/icons/Business';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/departaments">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText component="a" primary="Departamentos" />
    </ListItem>
    <ListItem button component="a" href="/campaign">
      <ListItemIcon>
        <EmojiObjectsIcon />
      </ListItemIcon>
      <ListItemText component="a" primary="Campanhas" />
    </ListItem>
    <ListItem button component="a" href="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText component="a" primary="Relatórios" />
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