$('.fl-input').on('focus blur', function(e) {
	$(this).parents('.fl-wrap').toggleClass('fl-focused', (e.type === 'focus' || this.value.length > 0));
})
