// NLP Cloud types

interface SummaryObjectSucces {
    summary_text: string;
}

interface SummaryObjectFail {
    url: string;
}

interface SummaryError {
    response: {
        status: number;
        data: {
            detail: string;
        }
    }
}

type Theme = "light" | "dark" | "system";

type Status = "idle" | "loading" | "success" | "error";

type CopyBtnStatus = "idle" | "copied";

interface BoundingBox {
    BoudingBox: {
        bottom_row: number;
        left_col: number;
        right_col: number;
        top_row: number;
    }
}

interface Region {
    region_info: {
        bounding_box: {
            bottom_row: number;
            left_col: number;
            right_col: number;
            top_row: number;
        }
    }
}

interface DivCoords {
    left: number,
    top: number,
    right: number,
    bottom: number,
}

export type { SummaryObjectSucces, SummaryObjectFail, SummaryError, Theme, BoundingBox, Region, Status, DivCoords, CopyBtnStatus };
