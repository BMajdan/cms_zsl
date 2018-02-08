function ArrayFilter() {

	function* searchBar(collection, propertyName, propertyValue) {
		for (let key of Object.keys(collection)) {
			if (collection[key][propertyName].replace(/\s+/g, '').toLowerCase().search(propertyValue.replace(/\s+/g, '').toLowerCase()) != -1) {
				yield key;
			}
		}
	}

	function searchIndex(collection, propertyName, propertyValue) {
		return collection.map((e) => {
			return e[propertyName];
		}).indexOf(propertyValue);
	}

	return function (propertyName, propertyValue, collection, searchbar) {
		if (searchbar) {
			return searchBar(collection, propertyName, propertyValue);
		} else {
			return searchIndex(collection, propertyName, propertyValue);
		}
		return null;
	};

}

export default {
	name: 'ArrayFilter',
	fn: ArrayFilter
};