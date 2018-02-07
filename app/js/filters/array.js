function ArrayFilter() {

	return function(propertyName, propertyValue, collection, searchbar) {
		let indexes = [];
		let i=0, len=collection.length;
		for (; i<len; i++) {
				if(searchbar){
					if (collection[i][propertyName].replace(/\s+/g, '').toLowerCase().search(propertyValue.replace(/\s+/g, '').toLowerCase()) != -1){
						indexes.push(i);
					}
				}else{
					if (collection[i][propertyName] == propertyValue) {
						indexes.push(i);
					}
				}
		}

		if(indexes.length == 1){
			return indexes[0];
		} else if (indexes.length > 1){
			return indexes;
		}

		return null;
	};

}

export default {
	name: 'ArrayFilter',
	fn: ArrayFilter
};