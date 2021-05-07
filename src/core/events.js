
export default class Events  {
  constructor () {
    this.topics = {}
  }
  on ( topic, listener ) {
    // Create the topic's object if not yet created
    if (!this.topics[topic]) this.topics[topic] = []

    // Add the listener to queue
    let index = this.topics[topic].push(listener) - 1
    let _this = this
    // Provide handle back for removal of topic
    return {
      remove: function () {
        //delete topics[topic][index]
        _this.topics[topic].splice( index, 1 )
      }
    }
  }
  trigger ( topic, info ) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!this.topics[topic]) return

    // Cycle through topics queue, fire!
    this.topics[topic].forEach(  ( item ) => {
      item( info != undefined ? info : {} )
    } )
  }
  emit ( topic, info ) {
    this.trigger( topic, info )
  }
  fire ( topic, info ) {
    this.trigger( topic, info )
  }
  publish ( topic, info ) {
    this.trigger( topic, info )
  }
  destroy () {
    Object.keys( this.topics ).forEach( ( topic ) => {
      let topics = this.topics[topic]
      while ( topics.length > 0 ){
        topics.pop()
      }
    } )
    delete this.topics
  }
}
