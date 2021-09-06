const channels = {};
/**
 * Sigleton class to handle application wide events.
 */
const EventEmmiter = {
    subscribe(topic, listener) {
        // Create the topic's object if not yet created
        if (!channels.hasOwnProperty.call(channels, topic))
            channels[topic] = [];

        // Add the listener to queue
        let index = channels[topic].push(listener) - 1;
        // Provide handle back for removal of topic
        return {
            remove: function () {
                //delete topics[topic][index]
                channels[topic].splice(index, 1);
            },
        };
    },
    unsubscribe(topic, listener) {
        // Create the topic's object if not yet created
        if (channels.hasOwnProperty.call(channels, topic)) {
            // Add the listener to queue
            let index = channels[topic].findIndex((l) => l === listener);
            //delete topics[topic][index]
            channels[topic].splice(index, 1);
        }
    },
    publish(topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!channels.hasOwnProperty.call(channels, topic)) return;

        // Cycle through topics queue, fire!
        channels[topic].forEach((item) => {
            item(info != undefined ? info : {});
        });
    },
    remove(topic) {
        // channel is an array of listeners
        let channel = channels[topic];
        while (channel.length > 0) {
            channel.pop();
        }
        delete channels[topic];
    },
    destroy() {
        Object.keys(channels).forEach((topic) => {
            this.remove(topic);
        });
        channels = {};
    },
};

export default EventEmmiter;
