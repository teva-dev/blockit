/**
 * Block dependencies
 */

// Common styles for both and for editor only.
import './style.scss';
import './editor.scss';

// Blocks
import './blocks';

// Category icon.
import { blockitIcon } from './icons/icons.js';

/**
 * Internal block libraries
 */
const {
	updateCategory,
} = wp.blocks;

/**
 * Add category icon.
 */
if ( updateCategory ) {
	updateCategory( 'blockit', { icon: blockitIcon } );
}