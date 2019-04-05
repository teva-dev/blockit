// External Dependencies.
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { blockitIcon } from '../../icons/icons.js';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import getColClass from './get-col-class.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

export const name = 'blockit/section-column';

export const settings = {
	title: __( 'Section-column' ),
	parent: [ 'blockit/section' ],
	description: __( 'Single column for section block.' ),
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
		className: false,
		anchor: true,
		inserter: false,
		reusable: false,
	},

	attributes,

	edit,

	save,
};

/**
 * Override the default block element to add column classes on wrapper.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
const withClasses = createHigherOrderComponent( ( BlockListBlock ) => (
	( props ) => {
			const { name: blockName } = props;
			let className = props.className;

			if ( 'blockit/section-column' === blockName ) {
					className = classnames( className, getColClass( props ) );
			}

			return <BlockListBlock { ...props } className={ className } />;
	}
) );

addFilter( 'editor.BlockListBlock', 'core/editor/section-column/with-classes', withClasses );