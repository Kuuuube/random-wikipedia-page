# Pageview Data

## Usage

1. Download pageview data from [Wikimedia pageview_complete dumps](https://dumps.wikimedia.org/other/pageview_complete/). (Monthly data was used for `ja_wikipedia_top.json`)

2. Filter out data from only the wiki you want to find data in.

    For example: This regex can be used to filter for only data in the japanese wikipedia `^ja\.wikipedia.*`.

    I use [kuuubedit](https://github.com/Kuuuube/kuuubedit) for this.

3. Open `sort.py` and replace `input_filename`, `output_filename`, `output_variable`, and `max_entries` with your desired values.

4. Run `sort.py`
