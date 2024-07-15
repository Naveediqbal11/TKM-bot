ohconst fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJkMTdxUFFXU0krR3pBNVdFMjFVVngvT0MrWXNDS2xJUDRtc0x5WGVGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTNDbUFXSjRDVzJJUDhjRGxxeG1CaU5NeG1JZlFUZjdKalYzU1IzUmFFZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTjQ1NExLaVhhN2dLb1hDNmFqSFhkMEI2U1Rmbm1taEorVzZINWNHQjBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmWkh1d2dhMlhRV2lITDRlMGFXMnN3Rk4rQ2JZaTBwdXZkTVFKZmxvQzA0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhJRFo1TmcvYnZuakw4cDhNSW9zRHduUWdmTFpaMDlXdTNkeTlCUVpVM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InIzVkRKMStmQ0JQdVlpTGRub3Rsei9oOFh1UmVDc0Q1Tm5lbnVUMmRVVE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZEbExDMVVJckJWdmxZd3EwZmJDK056Vy9OMHlGdlRPVnoxNXllRkpXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1FFdmxqVjJDcnplb1U1b0tkOXZlNGFaQzYxMDR3c3YvdWFJWkpuVkJCbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklKbm9zTWhSTlltWFlVYjVweHY0S05lNVVONEV5R1B1QjJPbzVmVjl0L2FCaHU2b3VoWGptR0FwOWlPc3BHc0JaZU5YYXIxNHBkSTgxTzl4WW1wNERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAzLCJhZHZTZWNyZXRLZXkiOiJrSE1IbXBhYTZ4NUZKVVFaZ2NlVURuSlJJc2JIbSt3bzdmUG5kLzk0NXRVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA1ODQ2NDIxNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4RkQxQ0FFNjQxMjM3MTdBODE1MTZDQTgyN0U4OEQzNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMDY1MTA2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMwNTg0NjQyMTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNEEyNDkwRDQzMDEwRkJFRTZCOTkyQzFDN0Y0MDU1MDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTA2NTEwN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMTJNZUdEamdTYk82SVdsckR6cGlVdyIsInBob25lSWQiOiJmYTI0ZmU1OC04M2VmLTRhYjktYmQ2Mi0xZjljOTk2ZTY2NzUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDg0OGZqUmk2U2dRYzd1NDg0R052a2pyTEdNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5SR2JGL0w1Ly9ZN2RmdW5EY0E1MEQzWmhmcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJKRzk1OUxRMyIsIm1lIjp7ImlkIjoiOTIzMDU4NDY0MjE1OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibHVja3luYnAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BLb3haWUhFSUs5MWJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZjcldIMmZLcmIzQjNVdDdBSTFrYTB6WGRWcGV0T3JZMklDWWpRZGl6aWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjA4czBZLzg3N1hVU3BTaWhIbHF6ZU5XeEZNOFJYQ29IYU9SelN4Y0daSjM1azg4SHlhSjBHSXRSRFk4akZDVlgrL2ZOaHVyaHpoa1JvdUt4V2haVER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaK0c1R2NJVVlpMlpVYTlXSnJNWFRpMS9MalVUMkJYR0xrRDlEUnBkenhDWTljTWgrYzVvb203NHVkczB5M2hUQW5KNldhS0ZKWHBkRFgxOGdLN25Cdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA1ODQ2NDIxNTo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZYSzFoOW55cTI5d2QxTGV3Q05aR3RNMTNWYVhyVHEyTmlBbUkwSFlzNG4ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEwNjUxMDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSG5KIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
