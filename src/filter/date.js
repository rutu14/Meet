const getDate = ( isodate ) => {
    const months = [ "January","February","March","April","May","June","July","August","September","October","November","December" ];
    const currentDate = new Date( isodate );
    return( currentDate.getDate() + ' ' +( months[ currentDate.getMonth() ] ) + ' ' + currentDate.getFullYear());
};

const getDay = ( day ) => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const currentDate = new Date( day );
    return( days[ currentDate.getDay() ] );
}

export {
    getDate,
    getDay
};

