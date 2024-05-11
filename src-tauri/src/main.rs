// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::Disks;
use tauri::Manager;
use std::{fs::read_dir, path::Path};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn get_files(app: tauri::AppHandle, _window: tauri::Window) {
    let disks = Disks::new_with_refreshed_list();

    for disk in &disks {

        // gets the path to the disk
        let disk_path: &Path = disk.mount_point();

        // finds children of disk
        let entries = read_dir(disk_path).unwrap();

        for child in entries {

            let string_path: String = child.unwrap()
                                           .path()
                                           .to_str()
                                           .expect("Error: failed to convert path to str")
                                           .to_owned();

            println!("Name: {}", string_path);

            let _ = app.emit_all("event1", ());

        }
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn main() {
    build_tauri() 
}

fn build_tauri() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}