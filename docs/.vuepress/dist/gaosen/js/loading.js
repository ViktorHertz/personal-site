function loading() {
  setTimeout(() => {
    $('#app').prepend(`
      <div>
        <loading-page></loading-page>
      </div>
    `)
  },500)
  console.log('loading');
}

loading()