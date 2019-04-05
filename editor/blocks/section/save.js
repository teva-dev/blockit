/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.editor;

const SectionBlockSave = props => {

	const {

	} = props.attributes;

	let className = classnames(
		props.className,
	);

	return (
		<div className={ className }>
			<InnerBlocks.Content />
		</div>
	)

}

export default SectionBlockSave