import React from 'react'


const Tags = (props) => {
    const { image } = props
    return (
        <div>
            <ul>
                {image && image.tags.map(tag => {
                    return tag.split(' ').map((item, index) => {
                        return (
                            <div key={index}>
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