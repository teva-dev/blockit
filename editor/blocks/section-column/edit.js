/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ResponsiveTabPanel from '../../components/responsive-tab-panel';

/**
 * WordPress dependencies
 */
const { blockitVariables } = window;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody } = wp.components;

const SectionColumnBlockEdit = ( props ) => {

	const {
		columns
	} = props.attributes;

	// Pass an object to ResponsiveTabPanel to identify color icons ( ex : {sm: "#cccccc", lg: "#cccccc"} )
	const iconsColor = {};
	if ( blockitVariables && blockitVariables.media_sizes && Object.keys( blockitVariables.media_sizes ).length ) {
		Object.keys( blockitVariables.media_sizes ).forEach( ( media ) => {
			let sizeName = 'size';
			let orderName = 'order';
			let verticalAlignName = 'verticalAlign';

			if ( media !== 'all' ) {
					sizeName = `${ media }_${ sizeName }`; // sm_size
					orderName = `${ media }_${ orderName }`; // sm_order
					verticalAlignName = `${ media }_${ verticalAlignName }`; // sm_verticalAlign
			}

			// orderName and verticalAlignName always false if they are not responsive
			if ( ! props.attributes[ sizeName ] && ! props.attributes[ orderName ] && ! props.attributes[ verticalAlignName ] ) {
					iconsColor[ media ] = '#cccccc';
			}
		} );
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					<ResponsiveTabPanel iconsColor={ iconsColor }>
						{
							( tab ) => <p>{ tab.title }</p>
						}
					</ResponsiveTabPanel>
				</PanelBody>
			</InspectorControls>
			<div className="blockit-col-content">
				<InnerBlocks templateLock={ false } />
			</div>
		</Fragment>
	);

}

export default SectionColumnBlockEdit;