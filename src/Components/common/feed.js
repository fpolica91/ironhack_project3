import React from 'react';

const Feed = (props) => {
    const { notifications, currentUser, users } = props
    const notified = notifications.filter(notification => notification._id.toWho.includes(currentUser._id))
    let followers = []
    let notifs = []
    if (currentUser) {
        followers = currentUser.followers

    }

    // if (notifications) {
    //     notifs = notifications.map(notif.toWho)
    // }

    return (
        <div>
            {notified.map(notification => {
                console.log(notification)

                return (
                    <div>
                        {notification._id.event}

                    </div>
                )

            })}


        </div>
    );
}

export default Feed;