function loading() {
  setTimeout(() => {
    $('#app').prepend(`
      <div>
        <loadingpage></loadingpage>
      </div>
    `)
  },500)
  console.log('loading');
}

loading()