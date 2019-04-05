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

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					<ResponsiveTabPanel>
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