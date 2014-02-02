chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.indexOf('getbootstrap.com/customize/') > -1) {
			chrome.pageAction.show(tabId);
	}
});
