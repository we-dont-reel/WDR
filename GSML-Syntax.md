Requested content described in the message or prompt should be given in the form of GSML only. Use the following syntax and guidelines.

GSML Markup Syntax for Creating Slides:

@Slide;
#Title;
Add a title
#BigLabel;
Add label text
#Text;
Add some text
#Date;
yyyy/mm/dd
#Time;
Add a time
#Place;
Building or address
#List;
--Item 1
--Item 2...
#Table;
--Left text 1
Right text 1
--Left text 2
Right text 2...
#ChatBlock;
--Name 1: First person speaks (do not add a new line after the colon; continue as a paragraph)
Name 2: Second person replies (do not add a new line after the colon; continue as a paragraph)
--First person continues (no new line; continue the paragraph)
Second person continues (no new line; continue the paragraph)
#Links;
Link title 1
https://actual link 1
Link title 2
https://actual link 2...
#MCQOptions;
Right(option)
Wrong(option)
Wrong(option)
Wrong(option)
#TimeBomb;
No. of hours remaining

Guidelines for Generating GSML Slides:

1. Reuse the widgets above creatively across slides as needed.
2. Keep slide content balanced. Not too little, not overloaded. Adjust the slide count accordingly. Each slide can slightly exceed the balanced number of words or lines, up to 30% more.
3. Use emojis only if requested.
4. Ensure proper spelling and grammar throughout.
5. Use `#ChatBlock;` for dialogues:
   - Always alternate between the first and second person.
   - Each chat bubble should be as long as possible. Avoid short sentences with 4 or 5 words. They should be longer and more natural.
   - Do not use the same person reference (like "Self" and "You") in both roles. Pairs like "You and Me", "Me and Mirror", "Me and Inner Soul" are valid.
   - Prefer using "Me" instead of "Self".
   - If the slide has only bubbles, you can add 6 bubbles. Otherwise 4 is the maximum.
6. For tables, use only two columns. Don't start a new line unless it belongs to the right column. Always alternate between left and right.
7. If all three `#Place;`, `#Date;`, and `#Time;` are used together, they must appear alone on a slide. A very short line of text or heading may appear at the beginning or end if needed. But no more than one widget or element other than these 3. So total 4 widgets or elements including these 3 only. 
8. Do **not** include `@Slide;` for the **first** slide. Include `@Slide;` for **all subsequent** slides.
9. Each slide must begin with new widgets. Do not continue or extend a widget from the previous slide.
10. Output must be a **single, clean, copyable GSML block only**. No extra comments, explanations, or blank lines between slides.
11. A #Table; can have a maximum of 8 rows, in a single spell. Proceed to new slide if more. Categorise suitably.
12. A #List; can have a maximum of 8 items in a single spell. Proceed to new slide if more. Categorise suitably.
13. For #Text; you may include two medium-sized paragraphs or one very long paragraph as needed.
14. A #BigLabel can contain up to 5 words.
15. #MCQOptions; Do not add this unless asked. It should be one per slide only. Before it, Heading and Text as a question should be there.
16. #Links; 8 maximum per slide, in a single spell. Proceed to new slide if more. Categorise suitably. Do not add this unless asked, or a reference should be added. Check the working of links. If user requests to add specific links like forms, etc., proceed.
17. #TimeBomb; can be used to indicate the number of hours remaining. Use it only if the user provides explicit time references such as "You have to complete in 48 hours" or "You have 5 days left". Convert the time to decimal hours and add 0.1667 to the final value, without including any other text. Ignore durations less than 10 minutes. You can also add #TimeBomb;, depending on the context for clarity, but strictly follow this rule.
18. Wrap the final GSML output in a copyable code block using GSML as the language identifier, but do not include visible triple backticks or a GSML heading inside the block.