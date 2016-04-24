var Promise = require('bluebird');

module.exports = function (body, Model, srcSmall) {
  return new Promise(function (done, reject) {
    // Español
    _saveBucket (Model.Bucket, body.bucket, srcSmall)
    // Save Bucket English
    .then(function (d) {
      done(srcSmall);
    });
  });
};




function _saveBucket (BucketModel, bucketStr, src) {

  return new Promise(function (done, reject) {
    //Busca en el modelo si existe un bucket ya con ese nombre
    BucketModel.find({ text : bucketStr }, function (err, resultBucket) {
      if(err) reject(err);
      else {
        // Si no hay bucket con ese nombre lo crea y guarda
        if(resultBucket.length === 0) {

          var newBucket = new BucketModel({
            text : bucketStr,
            src : src.public.en.micro
          });

          newBucket.save(function (err){
            if(err) reject(err);
            else {
              done('Bucket Guardado en BD!');
            }
          });
        }
        else {
          done('Bucket ya existia en BD');
        }
      }
    });
  });
}
