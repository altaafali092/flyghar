export interface FiscalYear {
    id: number,
    fiscal_year: String,
    status: boolean
}
export interface OfficeSettings {
    id: number,
    fiscal_year_id: number,
    office_name: string,
    office_address: string,
    office_image: string,
    office_cover: string,
    office_phone: string,
    office_email: string,
    fb_url: string,
    insta_url: string,
    youtube_url: string,
}