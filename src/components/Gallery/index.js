import classNames from "classnames"
import React from "react"

import './Gallery.css'

const Gallery = ({Hidden})=>{
	return (
		<div className={classNames("Gallery", {"hidden": !Hidden})}>
			gallery goes here.
		</div>
	)
}

export default Gallery