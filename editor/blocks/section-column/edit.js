/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ResponsiveTabPanel from '../../components/responsive-tab-panel';
import { verticalTop, verticalCenter, verticalBottom } from '../../icons/icons.js';

/**
 * WordPress dependencies
 */
const { blockitVariables } = window;
const { __, sprintf } = wp.i18n;
const { Fragment } = wp.element;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Toolbar, Icon } = wp.components;

const SectionColumnBlockEdit = ( props ) => {

	const {
		attributes,
		setAttributes,
		isSelected,
	} = props;

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
			if ( ! attributes[ sizeName ] && ! attributes[ orderName ] && ! attributes[ verticalAlignName ] ) {
					iconsColor[ media ] = '#cccccc';
			}
		} );
	}

	const getDefaultColumnSizes = () => {
		const result = [
			{
					label: __( 'Inherit from larger' ),
					value: '',
			},
			{
					label: __( 'Auto' ),
					value: 'auto',
			},
		];

		for ( let k = 1; k <= 12; k++ ) {
			result.push( {
				label: sprintf( k === 1 ? __( '%d Column (%s)' ) : __( '%d Columns (%s)' ), k, `${ Math.round( ( 100 * k / 12 ) * 100 ) / 100 }%` ),
				value: k,
			} );
		}

		return result;
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					<ResponsiveTabPanel iconsColor={ iconsColor }>
						{
							( tabData ) => {
								let sizeName = 'size';

								if ( tabData.name !== 'all' ) {
										sizeName = `${ tabData.name }_${ sizeName }`; // ex: sm_size
								}

								return (
									<Fragment>
										<SelectControl
											label={ __( 'Size' ) }
											value={ attributes[ sizeName ] }
											onChange={ ( value ) => {
												setAttributes( {
													[ sizeName ]: value,
												} );
											} }
											options={ getDefaultColumnSizes() }
										/>
									</Fragment>
								)
							}
						}
					</ResponsiveTabPanel>
					<BaseControl
						label={ __( 'Vertical alignment' ) }
						className="blockit-vertical-alignment-control"
					>
						<Toolbar
							controls={ [
								{
									icon: <Icon icon={ verticalTop } />,
									title: __( 'Start' ),
									isActive: attributes.verticalAlign === 'start',
									onClick: () => {
										setAttributes( { 
											verticalAlign: attributes.verticalAlign === 'start' ? '': 'start',
										} );
									},
								},
								{
									icon: <Icon icon={ verticalCenter } />,
									title: __( 'Center' ),
									isActive: attributes.verticalAlign === 'center',
									onClick: () => {
										setAttributes( { 
											verticalAlign: attributes.verticalAlign === 'center' ? '': 'center',
										} );
									},
								},
								{
									icon: <Icon icon={ verticalBottom } />,
									title: __( 'End' ),
									isActive: attributes.verticalAlign === 'end',
									onClick: () => {
										setAttributes( { 
											verticalAlign: attributes.verticalAlign === 'end' ? '': 'end',
										} );
									},
								},
							] }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div className="blockit-col-content">
				<InnerBlocks templateLock={ false } />
			</div>
		</Fragment>
	);

}

export default SectionColumnBlockEdit;