export default function findLatestProgressReport (progressReports) {
  if(progressReports){
    for(let i = progressReports.length-1; i>=0; i-=1){
      if(!progressReports[i].isRetracted){
        return progressReports[i];
      }
    }
  }

  // If failed to find latest progress report:
  //
  return null;
}
