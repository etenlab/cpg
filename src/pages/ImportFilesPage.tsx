import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import JSZip from "jszip";

const links = [
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=bf8f1c7f3f9045a5&license=10453&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=66c22495370cdfc0&license=11152&revision=13&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=65bfdebd704a8324&license=15151&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=ec290b5045ff54a5&license=16648&revision=2&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=c315fa9f71d4af3a&license=10448&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=55ec700d9e0d77ea&license=16636&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=01b29f4b342acc35&license=18544&revision=30&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=2f0fd81d7b85b923&license=17539&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=55212e3cf5d04d49&license=17540&revision=1&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=40072c4a5aba4022&license=4018&revision=8&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=6bab4d6c61b31b80&license=16619&revision=3&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=65eec8e0b60e656b&license=10251&revision=9&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=179568874c45066f&license=9664&revision=2&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=bba9f40183526463&license=24374&revision=3&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=de4e12af7f28f599&license=9667&revision=4&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=7142879509583d59&license=4015&revision=87&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=32339cf2f720ff8e&license=31150&revision=3&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=32664dc3288a28df&license=30360&revision=13&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=685d1470fe4d5c3b&license=21401&revision=3&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=06125adad2d5898a&license=4013&revision=13&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=9879dbb7cfe39e4d&license=4019&revision=81&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=f72b840c855f362c&license=4016&revision=65&type=release",
  "https://app.thedigitalbiblelibrary.org/entry/download_archive?id=04da588535d2f823&license=4017&revision=64&type=release",
];

const ImportFilesPage: React.FC = () => {
  const buttonsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const [downloadIndex, setDownloadIndex] = useState(0);

  useEffect(() => {
    buttonsRef.current = buttonsRef.current.slice(0, links.length);
  }, []);

  const downloadHandler = async () => {
    setDownloadIndex(0);
    for (const [i, buttonRef] of buttonsRef.current.entries()) {
      buttonRef?.click();
      setDownloadIndex(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  };

  const openFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.item(0)) {
      return;
    }
    JSZip.loadAsync(e.target.files[0]).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        zip.files[filename].async("string").then(function (fileData) {
          console.log(filename);
          console.log(fileData);
        });
      });
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        Import Files Page
        <div>
          <button onClick={downloadHandler}>Download DBL Files</button>
        </div>
        <div>
          {links.map((link, i) => (
            <a
              href={link}
              key={`download-${i}`}
              ref={(el) => (buttonsRef.current[i] = el)}
            ></a>
          ))}
        </div>
        {!!downloadIndex && downloadIndex < links.length && (
          <div>
            Downloading {downloadIndex} of {links.length}...
          </div>
        )}
        {downloadIndex === links.length && <div>Download Finished.</div>}
        <div>
          <input type={"file"} multiple onChange={openFileHandler} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ImportFilesPage;
