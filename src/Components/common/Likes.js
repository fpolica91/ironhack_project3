import React from 'react'


const Likes = (props) => {
    const { pic } = props
    return (
        <div>
            {
                pic.likes.length === 0 ? "No one likes this" :
                    pic.likes.length < 2 ? `${pic.likes[0].username} Likes this` :
                        pic.likes.length === 2 ? `${pic.likes[0].username} and ${pic.likes[1].username}  Like this` :
                            pic.likes.length > 2 ? `${pic.likes[0].username} , ${pic.likes[1].username}  
                       and ${pic.likes.length - 2}
                       others Like this` : null
            }
        </div>
    );
}

export default Likes;