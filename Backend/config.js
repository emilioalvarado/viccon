module.exports = {
    port: process.env.PORT || 2017,
    db: process.env.MONGODB || 'mongodb://localhost:27017/viccon',
    MySql_db: 'Viccon',
    MySql_user: 'root',
    Mysql_pass: 'root',
    MySql_host: 'localhost',
    MySql_port: '8889',
 	  //rutaMultimedia: './images/multimediaViccon/',
 	rutaMultimedia: '/media/',
    nombreCarpetaOriginal: 'original/',
    nombreCarpetaConvertida: 'conversion/',
    nombreCarpetaThumb: 'thumb/',
    extension:'.mp4',
    pathREST:'http://localhost:2017/api/',
    rutaMultimediaCron: 'C:/Users/Taidy/viccon/public/media/',
}
