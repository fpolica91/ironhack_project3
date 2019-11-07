import React from 'react'


const Tags = (props) => {
    const { image } = props
    return (
        <div>
            <ul>
                {image && image.tags.map(tag => {
                    return tag.split(' ').map(item => {
                        return (
                            <div>
                                <li>{item}</li>
                            </div>
                        )
                    })
                })}
            </ul>
            <p>{image.caption}</p>
        </div>
    );
}

export default Tags;