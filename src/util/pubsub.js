const topics = {};
/**
 * Sigleton class to handle application wide events.
 */
const EventEmmiter = {
    subscribe(topic, listener) {
        // Create the topic's object if not yet created
        if (!topics.hasOwnProperty.call(topics, topic))
            topics[topic] = [];

        // Add the listener to queue
        let index = topics[topic].push(listener) - 1;
        let _this = this;
        // Provide handle back for removal of topic
        return {
            remove: function () {
                //delete topics[topic][index]
                _topics[topic].splice(index, 1);
            },
        };
    },
    unsubscribe(topic, listener) {
        // Create the topic's object if not yet created
        if (topics.hasOwnProperty.call(topics, topic)) {
            // Add the listener to queue
            let index = topics[topic].findIndex((l) => l===listener)
            //delete topics[topic][index]
            topics[topic].splice(index, 1);
        }
    },
    publish(topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!topics.hasOwnProperty.call(topics, topic)) return;

        // Cycle through topics queue, fire!
        topics[topic].forEach((item) => {
            item(info != undefined ? info : {});
        });
    },
    destroy() {
        Object.keys(topics).forEach((topic) => {
            let topics = topics[topic];
            while (topics.length > 0) {
                topics.pop();
            }
        });
        delete topics;
    },
};

export default EventEmmiter
