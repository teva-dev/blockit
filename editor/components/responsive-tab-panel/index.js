/**
 * Internal dependencies
 */
import { tabsMobile } from '../../icons/icons.js';
import { tabsTablet } from '../../icons/icons.js';
import { tabsLaptop } from '../../icons/icons.js';
import { tabsDesktop } from '../../icons/icons.js';
import { tabsTv } from '../../icons/icons.js';

/**
 * WordPress dependencies
 */
const { blockitVariables } = window;
const { __ } = wp.i18n;
const {	TabPanel, Icon, Tooltip } = wp.components;

const ResponsiveTabPanel = ( props ) => {

	const {
		children
	} = props;

	if ( ! blockitVariables || ! blockitVariables.media_sizes || ! Object.keys( blockitVariables.media_sizes ).length ) {
		return __( 'No media sizes found.' );
	}

	const tabs = []
	const icons = [
		tabsMobile,
		tabsTablet,
		tabsLaptop,
		tabsDesktop,
		tabsTv,
	];

	Object.keys( blockitVariables.media_sizes ).forEach( ( mediaName, i ) => {
		tabs.unshift( {
			name: mediaName,
			title: (
				<Tooltip text={ sprintf( __( 'Devices with screen width <= %s' ), `${ blockitVariables.media_sizes[ mediaName ] }px` ) }>
					<span>
						<Icon icon={ icons[i] } />
					</span>
				</Tooltip>
			),
		} );
	} );

	return (
		<TabPanel
			className="blockit-control-tabs"
			tabs={ tabs }
		>
			{ children }
		</TabPanel>
	)

}

export default ResponsiveTabPanel;