// External Dependencies.
import classnames from 'classnames';

const {
    applyFilters,
} = wp.hooks;

/**
 * Returns the ready to use className for grid column.
 *
 * @param {object} props - block properties.
 *
 * @return {String} Classname for columns.
 */
export default function getColClass( props ) {
    const {
        attributes,
    } = props;
		let result = 'blockit-col';
		
		// Debug
		// console.log( attributes )
		// console.log( Object.keys( attributes ) )
		// if ( attributes[ 'size' ] ) { console.log( 'true' ) } else { console.log( 'false' ) }
		// Debug end

    Object.keys( attributes ).map( ( key ) => {
        if ( attributes[ key ] ) {
            let prefix = key.split( '_' )[ 0 ];
            let type = key.split( '_' )[ 1 ];

            if ( ! type ) {
                type = prefix;
                prefix = '';
            }

            if ( type && ( type === 'size' || type === 'order' || type === 'verticalAlign' ) ) {
                prefix = prefix ? `-${ prefix }` : '';

                switch ( type ) {
                case 'size':
                    type = '';
                    break;
                case 'order':
                    type = `-${ type }`;
                    break;
                case 'verticalAlign':
                    type = '-align-self';
                    break;
                }

                result = classnames(
                    result,
                    `blockit-col${ type }${ prefix || '' }${ attributes[ key ] !== 'auto' ? `-${ attributes[ key ] }` : '' }`
                );
            }
        }
		} );

		// Debug
		// console.log( result )
		// Debug end

    result = applyFilters( 'blockit.editor.className', result, props );

    return result;
}
