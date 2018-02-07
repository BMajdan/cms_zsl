function ArrayFilter() {

	return function(propertyName, propertyValue, collection) {
		let i=0, len=collection.length;
		for (; i<len; i++) {
				if (collection[i][propertyName] == propertyValue) {
						return i;
				}
		}
		return null;
	};

}

export default {
	name: 'ArrayFilter',
	fn: ArrayFilter
};