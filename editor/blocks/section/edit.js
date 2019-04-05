/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { blockitIcon } from '../../icons/icons.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, Placeholder, Icon, Tooltip } = wp.components;


class SectionBlockEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedLayout: false
		};

		this.onLayoutSelect = this.onLayoutSelect.bind( this );
		this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
	}

	componentDidUpdate() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		let { columns } = attributes;

		// update columns number
		if ( this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
			columns = columnsData.length;

			setAttributes( {
				columns,
			} );

			this.setState( {
				selectedLayout: false,
			} );
		}
	}

	getColumnsFromLayout( layout ) {
		const result = [];
		const columnsData = layout.split( '-' );

		columnsData.forEach( (col) => {
			const colAttrs = {
				size: col === 'a' ? 'auto' : col,
			};

			// responsive.
			if ( columnsData.length === 2 ) {
				colAttrs.md_size = '12';
			}
			if ( columnsData.length === 3 ) {
					colAttrs.lg_size = '12';
			}
			if ( columnsData.length === 4 ) {
					colAttrs.md_size = '12';
					colAttrs.lg_size = '6';
			}
			if ( columnsData.length === 5 ) {
					colAttrs.sm_size = '12';
					colAttrs.md_size = '5';
					colAttrs.lg_size = '4';
			}
			if ( columnsData.length === 6 ) {
					colAttrs.sm_size = '6';
					colAttrs.md_size = '4';
					colAttrs.lg_size = '3';
			}

			result.push( colAttrs );
		} )
		
		return result;
	}

	onLayoutSelect( layout ) {
		this.setState( {
			selectedLayout: layout,
		} );
	}

	getLayoutsSelector() {

		let layouts = [
			'12',
			'6-6',
			'4-4-4',
			'3-3-3-3',

			'5-7',
			'7-5',
			'3-3-6',
			'3-6-3',

			'6-3-3',
			'2-8-2',
			'a-a-a-a-a',
			'2-2-2-2-2-2',
		];

		return (
			<Placeholder
				label={ __( 'Section' ) }
				icon={ <Icon icon={ blockitIcon } /> }
				instructions={ __( 'Select one layout to get started.' ) }
				className="blockit-section-layout"
			>
				<div className="blockit-section-layout-picker">
					{
						layouts.map( (layout) => {

							const columnsData = this.getColumnsFromLayout( layout );

							return(
								<button
									key={ `layout-${ layout }` }
                  className="blockit-section-layout-picker-btn"
									onClick={ () => this.onLayoutSelect( layout ) }
								>
									{
										columnsData.map( (colAttrs, i) => {
											return (
												<div
														key={ `layout-${ layout }-col-${ i }` }
														className={ classnames( 'blockit-col', `blockit-col-${ colAttrs.size }` ) }
												/>
											)
										} )
									}
								</button>
							)

						} )
					}
				</div>
			</Placeholder>
		)

	}

	getColumnsTemplate() {
		const {
			attributes,
		} = this.props;

		let { columns	} = attributes;

		const result = [];

		// create columns from selected layout.
		if ( columns < 1 && this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );

			// columns = columnsData.length;

			columnsData.forEach( ( colAttrs ) => {
				result.push( [ 'blockit/section-column', colAttrs, [
					[ 'core/paragraph', { content: 'Column ' + ( colAttrs.size === 'auto' ? 'Auto' : colAttrs.size + '/12' ) } ],
				] ] );
			} );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [ 'blockit/section-column' ] );
			}
		}

		return result;

	}

	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			columns
		} = attributes;

		let className = classnames(
			this.props.className, // wp-block-blockit-section.
		);

		return (
			<Fragment>

				<InspectorControls>

					<PanelBody>

						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ 12 }
						/>

					</PanelBody>

				</InspectorControls>

				<div className={ className }>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							{ ! isSelected ? (
								<div className="blockit-section-button-select">
									<Tooltip text="Select Section">
										<Fragment>
											{ <Icon icon={ blockitIcon } /> }
										</Fragment>
									</Tooltip>
								</div>
							) : '' }
							<InnerBlocks
								template={ this.getColumnsTemplate() }
								templateLock="all"
								allowedBlocks={ [ 'blockit/section-column' ] }
							/>
						</Fragment>
					) : this.getLayoutsSelector() }
				</div>

			</Fragment>
		);
	}
}

export default SectionBlockEdit;