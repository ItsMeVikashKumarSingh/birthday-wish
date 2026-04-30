# Environment Variables

Following is the list of all the environment variables that are used in this project.

```sh
  # Mandatory Variables
  NAME
  PIC

  # Optional Variables
  NICKNAME
  HBD_MSG
  SMALL_MSG
  PIC_CAPTION
  SENDER_NAME
  SCROLL_MSG
  OPEN_DATE
  
  # NASA Section (Optional)
  NASA_INTRO
  PIC2
  PIC2_CAPTION
  
  # Wishes Section (Optional)
  WISHES_TITLE
  WISHES
```

- **NAME & NICKNAME**: Self-explanatory. `NICKNAME` is optional; if omitted, `NAME` is used.
- **PIC**: The main image on the card. 
  - Local: Place in `./local/` and use filename.
  - Remote: Use direct web URL.
- **PIC_CAPTION**: Text appearing below the main picture.
- **SMALL_MSG**: A short, catchy message at the bottom of the main card.
- **SENDER_NAME**: Your name, which appears in various parts of the card.
- **SCROLL_MSG**: Custom scrolling message.
  - Local: `.txt` file in `./local/`.
  - Remote: [Telegra.ph](https://telegra.ph) article URL.
- **OPEN_DATE**: `YYYY-MM-DD` format. Prevents opening before this date.
- **NASA Section**:
  - `NASA_INTRO`: Introduction to the satellite view.
  - `PIC2`: Secondary image (e.g., satellite view).
  - `PIC2_CAPTION`: Detailed description for the secondary image.
- **Wishes Section**:
  - `WISHES_TITLE`: Custom title for the wishes page.
  - `WISHES`: The long-form message/wishes.

---

<div align="center">Made with 💖 by Vikash Kumar Singh</div>
