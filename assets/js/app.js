$(document).ready(function () {
	let paragraphs = [];
	const editor = $('#editor');
	editor.focus();
	let activeId = null;


	/**
	 * Add a focus event listener to the editor
	 * Insert new paragraph, and set it as the active paragraph
	 */
	editor.focus(function (e) {
		if($(this).html().trim().length === 0) {
			const para = new Paragraph();  // Paragraph class is implemented in util.js file
			const id = para.getId();
			setActiveId(id);
			const element = $(`<p data-id=${id} id=${id} contentEditable="true"></p>`);
			$(this).append(el).attr('contentEditable','false');
			element.focus();
			insertNewParagraph();
		}
	});

	/**
	 * Update paragraph for backspace buttons
	 */
	$(document).keydown(function (e) {
		if (e.which === (8 || 46)) {
			const currentParagraph = $(`p[data-id=${activeId}]`);
			const text = currentParagraph.text().trim();
			if(!text) {
				const previousParagraph = currentParagraph.prev();
				currentParagraph.remove();
				paragraphs = paragraphs.filter((paragraph, index) => paragraph.id !== activeId);
				if(previousParagraph) {
					previousParagraph.focus();
				}else {
					insertNewParagraph();
				}
			}
		}
	});


	/**
	 * Add a keyup event listener to a paragraph to set active paragraph
	 */
	editor.on('keyup', 'p', function (e) {
		const text = $(this).html().trim();
		if(text) {
			const id = $(this).data('id');
			setActiveId(id);
		}
	});

	/**
	 * Add a keypress event listener to a paragraph for ENTER key
	 */
	editor.on('keypress', 'p', function (e) {
		if(e.which === 13) {
			e.preventDefault();
			const cursorPoint = getCaretPos($(this).get(0));
			const currentText = $(this).html();
			const currentLineText = currentText.substring(0, cursorPoint);
			const nextLineText = currentText.substring(cursorPoint, currentText.length + 1);
			$(this).html(currentLineText);
			updateParagraphInArray(activeId, currentLineText);
			insertNewParagraph(nextLineText);
		}
	});

	/**
	 * @function This function creates and inserts new paragraph
	 * @param content the optional content of the new paragraph
	 */
	function insertNewParagraph(content = ''){
		const para = new Paragraph(content);
		const id = para.getId();
		const el = $(`<p data-id=${id} id=${id} contentEditable="true">${para.getContent()}</p>`);
		editor.append(el);
		el.focus();
		setActiveId(id);
		paragraphs.push(para.getObject());
	}

	/**
	 * @function This function updates a paragraph that has changed in the DOM in the array
	 * @param id
	 * @param content
	 */
	function updateParagraphInArray(id, content){
		if(id && content) {
			paragraphs.forEach(function(paragraph, index){
				if(paragraph.id === id) {
					paragraph.content = content;
				}
			});
		}
		console.log('paragraphs ', paragraphs);
	}

	/**
	 * @function Sets the id of the active paragraph in the DOM
	 * @param id
	 */
	function setActiveId(id) {
		activeId = id;
	}
});
