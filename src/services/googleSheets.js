const { google } = require('googleapis');
const fs = require('fs');

// Carregar credenciais do arquivo JSON
const credentials = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS, 'utf-8')
);

// Autenticação do Google
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
});

const appendToSheet = async (row) => {
    try {
      const client = await auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });
  
      const sheetId = process.env.GOOGLE_SHEET_ID;
      const range = 'A1'; // Começa na primeira linha da planilha
  
      // Envia os dados para o Google Sheets
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
          values: [row], // Cada array aqui é uma linha na planilha
        },
      });
      console.log('Lead salvo na planilha!');
    } catch (error) {
      console.error('Erro ao salvar na planilha:', error.message);
    }
  };
  
module.exports = { appendToSheet };
