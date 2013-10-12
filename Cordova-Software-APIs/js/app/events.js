document.addEventListener("batterylow",
								  function() {
									  navigator.notification.alert("batterylow");
								  }, 
								  false);