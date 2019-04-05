/**
 * CSS
 */
import './editor.scss';
import './style.scss';

/**
 * Internal dependencies
 */
import { blockitIcon } from '../../icons/icons.js';
import attributes from './attributes';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

export const name = 'blockit/section';

export const settings = {
	title: __( 'Section' ),
	description: __( 'Responsive section block to build layouts.' ),
	icon: {
		background: 'rgba(254, 243, 224, 0.52)',
		color: 'rgba(255, 0, 0)',
		src: blockitIcon,
	},
	category: 'blockit',
	keywords: [
		__( 'section' ),
		__( 'row' ),
		__( 'columns' ),
	],
	supports: {
			html: false,
			anchor: true,
			align: [ 'wide', 'full' ],
	},

	attributes,

	edit,

	save,
};
