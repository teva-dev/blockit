/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * Internal dependencies
 */
import getColClass from './get-col-class.js';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.editor;

const SectionColumnBlockSave = props => {

	const {

	} = props.attributes;

	let className = getColClass( props );

	return (
		<div className={ className }>
			<div className="blockit-col-content">
				<InnerBlocks.Content />
			</div>
		</div>
	)

}

export default SectionColumnBlockSave