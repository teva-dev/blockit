import './editor.scss';

/**
 * Internal dependencies
 */
import { tabsMobile } from './icons.js';
import { tabsTablet } from './icons.js';
import { tabsLaptop } from './icons.js';
import { tabsDesktop } from './icons.js';
import { tabsTv } from './icons.js';

/**
 * WordPress dependencies
 */
const { blockitVariables } = window;
const { __, sprintf } = wp.i18n;
const {	TabPanel, Icon, Tooltip } = wp.components;

const ResponsiveTabPanel = ( props ) => {

	const {
		iconsColor = {},
		children,
		activeClass = 'is-active',
		orientation = 'horizontal',
	} = props;
console.log(props)
	if ( ! blockitVariables || ! blockitVariables.media_sizes || ! Object.keys( blockitVariables.media_sizes ).length ) {
		return __( 'No media sizes found.' );
	}

	const tabs = []
	const icons = [
		tabsMobile,
		tabsTablet,
		tabsLaptop,
		tabsDesktop,
		// tabsTv,
	];

	Object.keys( blockitVariables.media_sizes ).forEach( ( mediaName, i ) => {
		tabs.unshift( {
			name: mediaName,
			title: (
				<Tooltip text={ sprintf( __( 'Devices with screen width <= %s' ), `${ blockitVariables.media_sizes[ mediaName ] }px` ) }>
					<span style={ iconsColor && iconsColor[ mediaName ] ? {
						color: iconsColor[ mediaName ],
					} : {} }>
						<Icon icon={ icons[i] } />
					</span>
				</Tooltip>
			),
			className: 'blockit-control-tabs-tab',
		} );
	} );
	tabs.unshift( {
		name: 'all',
		title: (
			<Tooltip text={ __( 'All devices' ) }>
				<span>
					<Icon icon={ tabsTv } />
				</span>
			</Tooltip>
		),
		className: 'blockit-control-tabs-tab',
	} );

	return (
		<TabPanel
			className="blockit-control-tabs"
			tabs={ tabs }
			activeClass={ activeClass }
			orientation={ orientation }
		>
			{ children }
		</TabPanel>
	)

}

export default ResponsiveTabPanel;