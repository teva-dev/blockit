/**
 * Internal dependencies
 */
import * as section from './section';
import * as sectionColumn from './section-column';

/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

/**
 * Register blocks
 */
const registerBlockitBlocks = () => {

	[
		section,
		sectionColumn
	].forEach( ( block ) => {
		if ( ! block ) {
			return;
		}
		const { name, settings } = block;
		registerBlockType( name, settings );
	} );

}
registerBlockitBlocks();