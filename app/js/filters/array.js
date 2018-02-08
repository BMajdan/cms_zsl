function ArrayFilter() {

	function searchBar(collection, propertyName, propertyValue){
		let keys = [];
		let i = 0;
		for(let value of collection){
			if (value[propertyName].replace(/\s+/g, '').toLowerCase().search(propertyValue.replace(/\s+/g, '').toLowerCase()) != -1) {
				keys.push(i);
			}
			i++;
		}
		return keys;
	}

	function searchIndex(collection, propertyName, propertyValue) {
			return collection.map((e) => {
			  return e[propertyName];
			}).indexOf(propertyValue);
	}

	return function(propertyName, propertyValue, collection, searchbar) {
		if(searchbar){
			return searchBar(collection, propertyName, propertyValue);
		}else{
			return searchIndex(collection, propertyName, propertyValue);
		}
		return null;
	};

}

export default {
	name: 'ArrayFilter',
	fn: ArrayFilter
};