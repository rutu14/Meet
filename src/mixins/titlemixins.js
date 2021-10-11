function getTitle ( roott ) {
    const { title } = roott.$options;
    if (title) {
      return typeof title === 'function' ? title.call(roott) : title
    }
  }
  export default {
    created () {
      const title = getTitle(this)
      if (title) {
        document.title = title;
      }
    }
  }