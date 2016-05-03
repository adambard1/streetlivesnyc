import React from 'react';

import '../scss/search.scss';

module.exports.Search = React.createClass({
    _focus: function() {
      var self = this;

      setTimeout(function() {
        self.refs.searchBar.focus();
      }, 500);
    },

    _initAutoComplete: function() {
      var input = this.refs.searchBar;
      this.autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'USA' }
      });

      google.maps.event.addListener(this.autocomplete, 'place_changed', this._onPlaceChange);
    },

    _onPlaceChange: function() {

      var place = this.autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      this.props.gotoPlace(place);
    },

    componentDidMount: function() {
        this._initAutoComplete();
        this._focus();
    },

    render: function() {
        return (
            <div className='InputField SearchField'>
                <input type='text' placeholder='Search' ref="searchBar" className="Input SearchInput js-field" />
            </div>
        )
    }
});
