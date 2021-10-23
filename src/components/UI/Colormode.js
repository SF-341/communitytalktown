import * as React from 'react';
import {  ThemeProvider, createTheme } from '@material-ui/core/styles';


import CssBaseline from "@material-ui/core/CssBaseline";

import { grey } from '@mui/material/colors';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


export function ToggleColorMode({ children }) {
  const [mode, setMode] = React.useState('light');
  const [bg, setBg] = React.useState(grey[100]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        setBg((prevMode) => (prevMode === grey[100] ? grey[900] : grey[100]));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          type: mode,

          background: {
            backgroundColor: bg,
          }
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
